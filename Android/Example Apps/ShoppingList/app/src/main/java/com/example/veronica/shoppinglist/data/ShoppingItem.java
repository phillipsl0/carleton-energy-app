package com.example.veronica.shoppinglist.data;

import android.util.Log;
import android.widget.ImageView;

import com.example.veronica.shoppinglist.R;
import com.orm.SugarRecord;

import java.io.Serializable;

/**
 * Created by Veronica on 11/3/16.
 */

public class ShoppingItem extends SugarRecord implements Serializable {
    private String name;
    private String cost;
    private String descrp;
    private int category;
    private boolean bought;
    private int iconCat;

    public ShoppingItem() {
    }

    public ShoppingItem(String name, String cost,
                        String descrp, int cat, boolean bought, int iconLocation) {
        this.name = name;
        this.cost = cost;
        this.category = cat;
        this.descrp = descrp;
        this.bought = bought;
        this.iconCat = iconLocation;
    }

    public String getShoppingItemCost() {
        return cost;
    }

    public void setShoppingItemCost(String itemCost) {
        cost = itemCost;
    }

    public String getShoppingItemDescrp() {
        return this.descrp;
    }

    public void setShoppingItemDescrp(String descrp) {
        this.descrp = descrp;
    }

    public int getShoppingItemIcon() {return this.iconCat;}

    public int getShoppingItemCat() {
        return this.category;
    }

    /*
    Sets both category label and image of an icon
     */
    public void setShoppingItemCat(int category) {
        this.category = category;
        if (this.category == 0){
            this.iconCat = R.drawable.dairy_icon;
        } else if (this.category == 1) {
            this.iconCat = R.drawable.meat_icon;
        } else if (this.category == 2) {
            this.iconCat = R.drawable.produce_icon;
        } else if (this.category == 3) {
            this.iconCat = R.drawable.personal_care_icon;
        } else if (this.category == 4) {
            this.iconCat = R.drawable.misc_icon;
        }
    }

    public String getShoppingItemName() {
        return this.name;
    }

    public boolean isBought() {
        return this.bought;
    }

    public void setShoppingItemName(String name) {
        this.name = name;
    }

    public void setBought(boolean bought) {
        this.bought = bought;
    }
}
