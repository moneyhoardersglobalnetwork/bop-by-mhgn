// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//The MHGN Hoarding contract was written by @moneyhoardermike with help from Polygon Co-Pilot.
//Its follows MHGN's Project 6 model and allows for Hoarding/Staking of the token address passed in constructor.
//This Contract is for BOP "Blocks Of Passion Token" hoarding.
contract BopHoardingContract is Ownable, ReentrancyGuard {
    struct Hoarder {
        uint256 hoarded;
        uint256 timeHoarded;
        bool isHoarding;
        uint256 Total_AllTime_Hoarded;
        uint256 reward;
        uint256 Total_AllTime_Reward;
    }
    
    mapping (address => Hoarder) public hoarders;
    uint256 timeHoarded;
    uint256 public totalHoarded = 0;
    uint256 public Total_Hoarders = 0;
    uint256 public Total_Reward_Pool;
    ERC20 public hoardingToken;

    event Hoarded(address indexed user, uint256 amount);
    event Pooled(address indexed user, uint256 amount);
    event UnHoarded(address indexed user);

    constructor() {
        hoardingToken = ERC20(0xC556Cf22AB6d65D7f0Be0355e80A54Ef9E23F7Bb);  //Polygon
    }
    //Function to hoard tokens.
    function Hoard(uint256 _amount) external nonReentrant {
        require(!hoarders[msg.sender].isHoarding, "Hoarder already exist");
        require(hoardingToken.balanceOf(msg.sender) >= 0, "You cannot hoard more tokens than you hold and hoarding is Non-ReEntry");
        hoardingToken.transferFrom(msg.sender, address(this), _amount);
        hoarders[msg.sender].hoarded += _amount;
        hoarders[msg.sender].timeHoarded = block.timestamp;
        hoarders[msg.sender].isHoarding = true;
        hoarders[msg.sender].Total_AllTime_Hoarded += _amount;
        totalHoarded += _amount;
        Total_Hoarders += 1;
        emit Hoarded(msg.sender, _amount);
    }
    //Function to allow hoarders to increase their hoard.
    function IncreaseHoard(uint256 _amount) public  {
        require(hoardingToken.balanceOf(msg.sender) >= 0, "You cannot hoard more tokens than you hold");
        hoardingToken.transferFrom(msg.sender, address(this), _amount);
        hoarders[msg.sender].hoarded += _amount;
        hoarders[msg.sender].isHoarding = true;
        hoarders[msg.sender].Total_AllTime_Hoarded += _amount;
        totalHoarded += _amount;
        emit Hoarded(msg.sender, _amount);
    }
    //Function to calculate reward for current hoard.
    function calculateReward(address _hoarder) public view returns (uint256) {
        uint256 hoardingTime = block.timestamp - hoarders[_hoarder].timeHoarded;
        uint256 annualReward = (hoarders[_hoarder].hoarded * 6) / 100;
        uint256 reward = (annualReward * hoardingTime) / 31536000;  // 365 days in seconds
        return reward;
    }
    //Function to withdraw hoard and claim rewards
    function ClaimReward() public {
        require(hoarders[msg.sender].isHoarding == true, "You cannot unhoard if you are not hoarding");
        require(block.timestamp >= hoarders[msg.sender].timeHoarded + 6 days, "You cannot Claim in the first 6 days of hoarding following the project 6 model");
        hoardingToken.transfer(msg.sender, hoarders[msg.sender].hoarded);
        totalHoarded -= hoarders[msg.sender].hoarded;
        uint256 reward = calculateReward(msg.sender);
        require(hoardingToken.balanceOf(address(this)) >= reward, "The contract does not have enough tokens to give you the reward");
        hoardingToken.transfer(msg.sender, reward);
        hoarders[msg.sender].Total_AllTime_Reward += reward;
        hoarders[msg.sender].reward += reward;
        hoarders[msg.sender].hoarded = 0;
        hoarders[msg.sender].timeHoarded = 0;
        hoarders[msg.sender].isHoarding = false;
        Total_Hoarders -= 1;
        Total_Reward_Pool -= reward;
    }
    //Function to withdraw hoard and claim rewards
    function Unhoard() public {
        require(hoarders[msg.sender].isHoarding == true, "You cannot unhoard if you are not hoarding");
        require(block.timestamp >= hoarders[msg.sender].timeHoarded + 6 minutes, "You cannot unhoard in the first 6 minutes of hoardinging following the project 6 model");
        hoardingToken.transfer(msg.sender, hoarders[msg.sender].hoarded);
        totalHoarded -= hoarders[msg.sender].hoarded;
        uint256 reward = calculateReward(msg.sender);
        require(hoardingToken.balanceOf(address(this)) >= reward, "The contract does not have enough tokens to give you the reward");
        hoardingToken.transfer(msg.sender, reward);
        hoarders[msg.sender].Total_AllTime_Reward += reward;
        hoarders[msg.sender].reward += reward;
        hoarders[msg.sender].hoarded = 0;
        hoarders[msg.sender].timeHoarded = 0;
        hoarders[msg.sender].isHoarding = false;
        Total_Hoarders -= 1;
        Total_Reward_Pool -= reward;
    }
    //Read only function that checks the hoarders hoarding time in seconds.
    function GetHoardingingTimeInSeconds(address _hoarder) public view returns (uint256) {
        return block.timestamp - hoarders[_hoarder].timeHoarded;
    }
    //Read only function that checks the users non-hoarding balance.
    function CheckBopBalance(address _owner) public view returns (uint256) {
        return hoardingToken.balanceOf(_owner);
    }
        //Read only function that checks the users hoarding balance.
    function Check_Bop_Hoarded_Balance(address _owner) public view returns (uint256) {
        return hoarders[_owner].hoarded;
    }
    //Transfers tokens to the hoarding rewards pool as a donation the tokens can't be withdrawn!
    function DonationPool(uint256 _amount) public  {
        require(hoardingToken.balanceOf(msg.sender) >= 0, "You cannot pool more tokens than you hold");
        hoardingToken.transferFrom(msg.sender, address(this), _amount);
        Total_Reward_Pool += _amount;
        emit Pooled(msg.sender, _amount);
    }
}