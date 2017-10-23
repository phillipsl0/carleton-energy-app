//
//  BuildingsViewController.swift
//  energyapp
//
//  Created by energyapp on 10/16/17.
//  Copyright © 2017 Carleton College. All rights reserved.
//

import Foundation
import UIKit

class BuildingsViewController: UITableViewController {
    private var buildings = BuildingItem.getBuildingData()
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return buildings.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell_building", for: indexPath)
        
        if indexPath.row < buildings.count {
            let item = buildings[indexPath.row]
            cell.textLabel?.text = item.title
        }
        
        return cell
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ShowBuildingDetails" {
            let detailViewController = segue.destination as! IndividualBuildingViewController
            
            let myIndexPath = self.tableView.indexPathForSelectedRow!
            detailViewController.BuildingName = buildings[myIndexPath.row].title
        }
    }
   
    
    
}

