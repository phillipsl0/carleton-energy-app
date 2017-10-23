//
//  buildingCellTableViewCell.swift
//  energyapp
//
//  Created by Andrew T Woosnam on 10/23/17.
//  Copyright © 2017 Carleton College. All rights reserved.
//

import UIKit
import WebKit

class buildingCellTableViewCell: UITableViewCell {
    
    @IBOutlet weak var webView: WKWebView!
    
    func getWebView() -> WKWebView {
        return webView
    }
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        webView.loadHTMLString("<html><body><font size=40>Hello!</font></br><font size=20>This is a raw HTML string</font></body></html>", baseURL: nil)
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
