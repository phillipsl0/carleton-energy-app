//
//  BuildingDetailViewController.swift
//  energyapp
//
//  Created by Andrew T Woosnam on 10/19/17.
//  Copyright © 2017 Carleton College. All rights reserved.
//

import UIKit

class BuildingDetailViewController: UIViewController {

    @IBOutlet weak var buildingDetailImage: UIImageView!
    @IBOutlet weak var buildingDetailTitle: UILabel!
    @IBOutlet weak var buildingDetailDesc: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        buildingDetailImage.image = UIImage(named: "sayles.jpg")
        buildingDetailTitle.text = buildingList[idx]
        buildingDetailDesc.text = buildingDescList[idx]
    
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
