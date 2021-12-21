// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Art3misLand is ERC1155 {

    constructor() ERC1155("https://art3mis.org/api/land/{id}.json")
    {
       _mint(msg.sender,1,1, "");
       _mint(msg.sender,2,1, "");
       _mint(msg.sender,3,1, "");
       _mint(msg.sender,4,1, "");
       _mint(msg.sender,5,1, "");
       _mint(msg.sender,6,1, "");
       _mint(msg.sender,7,1, "");
       _mint(msg.sender,8,1, "");
       _mint(msg.sender,9,1, "");
       _mint(msg.sender,10,1, "");
       _mint(msg.sender,11,1, "");
       _mint(msg.sender,12,1, "");
       _mint(msg.sender,13,1, "");
       _mint(msg.sender,14,1, "");
       _mint(msg.sender,15,1, "");
       _mint(msg.sender,16,1, "");
       _mint(msg.sender,17,1, "");
       _mint(msg.sender,18,1, "");
       _mint(msg.sender,19,1, "");
       _mint(msg.sender,20,1, "");
    }

    function uri(uint256 _tokenId) override public pure returns (string memory){
        return string(
            abi.encodePacked(
            "https://art3mis.org/api/land/",
            Strings.toString(_tokenId),
            ".json"
        ));
    }
}
