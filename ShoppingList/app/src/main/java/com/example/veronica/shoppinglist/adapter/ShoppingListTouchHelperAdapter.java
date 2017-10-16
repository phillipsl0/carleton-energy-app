package com.example.veronica.shoppinglist.adapter;

/**
 * Created by Veronica on 11/3/16.
 */

public interface ShoppingListTouchHelperAdapter {
    /*
    Provides an interface for handling item movement
     */
    void onItemDismiss(int position);

    void onItemMove(int fromPosition, int toPosition);

}
