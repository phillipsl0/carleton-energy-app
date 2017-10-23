//
//  ViewBuildingController.swift
//  energyapp
//
//  Created by energyapp on 10/16/17.
//  Copyright © 2017 Carleton College. All rights reserved.
//

import Foundation
import UIKit

class IndividualBuildingViewController: UIViewController {
    @IBOutlet weak var BuildingNameLabel: UILabel!
    var BuildingName: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        BuildingNameLabel.text = BuildingName
        if let name = BuildingName {
            BuildingNameLabel.text = name
        }
        
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}
