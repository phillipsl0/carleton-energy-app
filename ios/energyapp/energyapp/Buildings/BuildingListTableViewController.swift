//
//  BuildingListTableViewController.swift
//  energyapp
//
//  Created by Andrew T Woosnam on 10/18/17.
//  Copyright © 2017 Carleton College. All rights reserved.
//

import UIKit
import WebKit

var buildingList = ["Burton", "Cassat", "CMC", "Davis", "Goodhue", "James", "Musser", "Myers", "Nourse", "Sevy", "Watson", "Willis"]
var buildingDescList = ["Burton is a residence hall.", "Cassat is a fairly new residence hall.", "CMC is the place to be.", "Some people have a hard time finding Davis Hall.", "No one wants to live in Goodhue.", "James Hall is also known as 'Memo'.", "Musser is a residence hall. It looks just like Myers.", "Myers is a residence hall. It looks just like Musser.", "Sometimes Lyman the cat hangs out in Nourse.", "Andrew lives in Sevy.", "Watson is a very tall residence hall.", "Who uses Willis?"]
var idx = 0

class BuildingListTableViewController: UITableViewController {
    

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return buildingList.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "buildingCard", for: indexPath) as! buildingCellTableViewCell
        
        cell.textLabel?.text = buildingList[indexPath.row]

        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        idx = indexPath.row
        performSegue(withIdentifier: "showBuildingDetail", sender: self)
    }
 
    /*
     override func viewDidLoad() {
     super.viewDidLoad()
     
     // Uncomment the following line to preserve selection between presentations
     // self.clearsSelectionOnViewWillAppear = false
     
     // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
     // self.navigationItem.rightBarButtonItem = self.editButtonItem
     }
     
     override func didReceiveMemoryWarning() {
     super.didReceiveMemoryWarning()
     // Dispose of any resources that can be recreated.
     }
     
     // MARK: - Table view data source
     
     override func numberOfSections(in tableView: UITableView) -> Int {
     // #warning Incomplete implementation, return the number of sections
     return 0
     }
     */

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
