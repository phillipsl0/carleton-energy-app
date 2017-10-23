//
//  BuildingData.swift
//  energyapp
//
//  Created by energyapp on 10/16/17.
//  Copyright © 2017 Carleton College. All rights reserved.
//

import Foundation

class BuildingItem {
    var title: String
    
    public init(title: String)
    {
        self.title = title
    }
}

extension BuildingItem {
    public class func getBuildingData() -> [BuildingItem] {
        return [
            BuildingItem(title: "Burton"),
            BuildingItem(title: "Sayles"),
            BuildingItem(title: "CMC")
        ]
    }
}
