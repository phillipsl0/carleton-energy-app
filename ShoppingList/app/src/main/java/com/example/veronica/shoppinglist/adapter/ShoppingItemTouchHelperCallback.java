package com.example.veronica.shoppinglist.adapter;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Color;
import android.graphics.RectF;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.util.Log;
import android.view.View;

import com.example.veronica.shoppinglist.MainActivity;
import com.example.veronica.shoppinglist.R;

/**
 * Created by Veronica on 11/3/16.
 */

public class ShoppingItemTouchHelperCallback extends ItemTouchHelper.Callback {
    /*
    Will tell if something has been swiped OR if something has been moved with drag and drop.
    Must then have access to adapter if things have been moved/changed to refresh the list.
     */

    private ShoppingListTouchHelperAdapter shoppingListTouchHelperAdapter;

    //constructor
    public ShoppingItemTouchHelperCallback(ShoppingListTouchHelperAdapter shoppingListTouchHelperAdapter) {
        this.shoppingListTouchHelperAdapter = shoppingListTouchHelperAdapter;
    }

    //Specifies can only drag flags up and down
    @Override
    public int getMovementFlags(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
        int dragFlags = ItemTouchHelper.UP | ItemTouchHelper.DOWN;
        int swipeFlags = ItemTouchHelper.START | ItemTouchHelper.END;
        return makeMovementFlags(dragFlags, swipeFlags);
    }

    @Override
    public boolean isLongPressDragEnabled() {
        return true;
    }

    @Override
    public boolean isItemViewSwipeEnabled() {
        return true;
    }

    @Override
    public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder,
                          RecyclerView.ViewHolder target) {
        shoppingListTouchHelperAdapter.onItemMove(viewHolder.getAdapterPosition(),
                target.getAdapterPosition()
        );
        return true;
    }

    /*
    Remove a single item from the list when it is swipped left, else edit when swipped right
     */
    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction) {
        if (direction == ItemTouchHelper.RIGHT) {
            //dismisses item if moved to the right
            shoppingListTouchHelperAdapter.onItemDismiss(viewHolder.getAdapterPosition());
        }
    }

    /*
    Method for drawing icons under swipe. Credit to Raj Amal.
     */
    @Override
    public void onChildDraw(Canvas c, RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, float dX, float dY, int actionState, boolean isCurrentlyActive) {
        //Bitmap icon;
        if (actionState == ItemTouchHelper.ACTION_STATE_SWIPE) {
            View itemView = viewHolder.itemView;

            float height = (float) itemView.getBottom() - (float) itemView.getTop();
            float width = height / 3;
            Paint p = new Paint();

            if(dX > 0){
                // Positive displacement, or swipe left to delete
                Log.d("TAG_SWIPE", "swiping left");
                p.setColor(Color.parseColor("#D32F2F"));
                RectF background = new RectF((float) itemView.getRight() + dX, (float) itemView.getTop(),(float) itemView.getRight(), (float) itemView.getBottom());
                c.drawRect(background,p);
            }
        }
        super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive);
    }
}
