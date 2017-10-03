package com.example.veronica.shoppinglist.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.veronica.shoppinglist.MainActivity;
import com.example.veronica.shoppinglist.R;
import com.example.veronica.shoppinglist.data.ShoppingItem;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.OnItemClick;
import butterknife.OnItemSelected;
import butterknife.OnTouch;
import co.dift.ui.SwipeToAction;

import static java.security.AccessController.getContext;

/**
 * Created by Veronica on 11/3/16.
 */

public class ShoppingListRecyclerAdapter extends RecyclerView.Adapter<ShoppingListRecyclerAdapter.ViewHolder>
        implements ShoppingListTouchHelperAdapter {
    /*
    Creates a view holder to display a single shopping item
    */
    public static class ViewHolder extends SwipeToAction.ViewHolder {
        @BindView(R.id.tvCost)
        TextView tvCost;
        @BindView(R.id.tvName)
        TextView tvName;
        @BindView(R.id.tvDescrp)
        TextView tvDescrp;
        @BindView(R.id.cbBought)
        CheckBox cbBought;
        @BindView(R.id.imgIcon)
        ImageView imgIcon;

        public Button btnEdit;

        public ViewHolder(View itemView) {
            super(itemView);

            ButterKnife.bind(this, itemView);

            btnEdit = (Button) itemView.findViewById(R.id.btnEdit);
        }
    }

    private List<ShoppingItem> shoppingItemList;
    private int lastPosition = -1;
    private Context context;

    public ShoppingListRecyclerAdapter(List<ShoppingItem> shoppingItemList, Context context) {
        this.shoppingItemList = shoppingItemList;
        this.context = context;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        //set null to parent for line to fit whole width of recycler view
        View shoppingItemRow = LayoutInflater.from(parent.getContext()).inflate(
                R.layout.shopping_item_row, parent, false);
        return new ViewHolder(shoppingItemRow);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.data = shoppingItemList.get(position);

        holder.cbBought.setChecked(shoppingItemList.get(position).isBought());
        holder.tvName.setText(shoppingItemList.get(position).getShoppingItemName());
        String cost = shoppingItemList.get(position).getShoppingItemCost();
        holder.tvCost.setText(context.getString(R.string.tv_cost, cost));
        holder.tvDescrp.setText(shoppingItemList.get(position).getShoppingItemDescrp());
        holder.imgIcon.setImageResource(shoppingItemList.get(position).getShoppingItemIcon());


        holder.btnEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //Edit button fades out upon click
                Animation fade = new AlphaAnimation(1.f, 0.f);
                fade.setDuration(400);
                fade.setAnimationListener(new Animation.AnimationListener() {
                    @Override
                    public void onAnimationStart(Animation animation) {
                    }

                    @Override
                    public void onAnimationEnd(Animation animation) {
                        ((MainActivity) context).startItemEditActivity(shoppingItemList.get(position), position);
                    }

                    @Override
                    public void onAnimationRepeat(Animation animation) {

                    }
                });
                view.startAnimation(fade);
            }
        });
        setAddAnimation(holder.itemView, position); //animates newly added object

        //code to handle Spent as check box is handled
        holder.cbBought.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String spent = (String) holder.tvCost.getText();
                spent = spent.replace("$", "");
                if (holder.cbBought.isChecked()) {
                    ((MainActivity) context).updateSpent(Integer.parseInt(spent));
                } else if (!holder.cbBought.isChecked()) {
                    ((MainActivity) context).updateSpent(-Integer.parseInt(spent));

                }
            }
        });
    }

    /*
    Method that applies add animation
     */
    private void setAddAnimation(View toAnimate, int position) {
        //animates newest addition to list
        if (position > lastPosition) {
            Animation anim = AnimationUtils.loadAnimation(
                    this.context, android.R.anim.slide_in_left);
            toAnimate.startAnimation(anim);
            lastPosition = position;
        }
    }

    @Override
    public int getItemCount() {
        return shoppingItemList.size();
    }

    /*
    Updates list when an item is remove
     */
    @Override
    public void onItemDismiss(int position) {
        ShoppingItem shoppingItem = shoppingItemList.get(position);
        //subtracts item's price from spent
        int cost = Integer.parseInt(shoppingItem.getShoppingItemCost());
        ((MainActivity) context).updateSpent(-cost);

        shoppingItemList.get(position).delete(); //removes from SugarORM
        shoppingItemList.remove(position); //removes from view list
        notifyItemRemoved(position);
    }

    /*
    Handles when an item is movevd on the list
     */
    @Override
    public void onItemMove(int fromPosition, int toPosition) {
        shoppingItemList.add(toPosition, shoppingItemList.get(fromPosition));
        shoppingItemList.remove(fromPosition);

        notifyItemMoved(fromPosition, toPosition);
    }

    /*
    Adds a new shopping item to the top of the list
     */
    public void addShoppingItem(ShoppingItem shoppingItem) {
        shoppingItem.save();
        // first parameter can be an index
        shoppingItemList.add(0, shoppingItem);

        // refresh the whole list
        //notifyDataSetChanged();

        // refresh only one position
        notifyItemInserted(0);
    }

    /*
    Updates the list with the specified edited shopping item
     */
    public void updateShoppingItem(int index, ShoppingItem shoppingItem) {
        shoppingItemList.set(index, shoppingItem);
        shoppingItem.save();
        notifyItemChanged(index);
    }

    /*
    Clears all shopping items from view and from data storage
     */
    public void clearAllItems() {
        for (ShoppingItem i : shoppingItemList) {
            i.delete();
        }
        shoppingItemList.clear();
        notifyDataSetChanged();
        ((MainActivity) context).updateSpent(0);
    }
}
