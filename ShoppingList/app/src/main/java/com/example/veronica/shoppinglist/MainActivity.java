package com.example.veronica.shoppinglist;

import android.content.Intent;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.TextView;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import co.dift.ui.SwipeToAction;

import com.example.veronica.shoppinglist.adapter.ShoppingItemTouchHelperCallback;
import com.example.veronica.shoppinglist.adapter.ShoppingListRecyclerAdapter;
import com.example.veronica.shoppinglist.data.ShoppingItem;

import java.util.List;

public class MainActivity extends AppCompatActivity {
    @BindView(R.id.tvSpent)
    TextView tvSpent;

    public static final String KEY_ITEM_CREATE = "KEY_ITEM_CREATE";
    public static final int REQUEST_CODE_ITEM_CREATE = 100;
    public static final String KEY_ITEM_EDIT = "KEY_ITEM_EDIT";
    public static final int REQUEST_CODE_EDIT = 101;

    private ShoppingListRecyclerAdapter shoppingListRecyclerAdapter;
    private RecyclerView recyclerShoppingList;
    private ShoppingItem itemToEditHolder;
    private int spent;
    private int itemToEditPosition = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ButterKnife.bind(this);

        setupUI();
    }

    private void setupUI() {
        setupToolbar();
        setupRecyclerView();
    }

    @OnClick(R.id.fab)
    public void saveClickHandler(FloatingActionButton fab) {
        startItemCreateActivity();
    }

    /*
    Clears all items from the list
     */
    @OnClick(R.id.btnClear)
    public void clearClickHandler(Button btnClear) {
        recyclerShoppingList.removeAllViews();
        shoppingListRecyclerAdapter.clearAllItems();
        //Clears amount spent
        updateSpent(0);
    }

    private void setupRecyclerView() {
        recyclerShoppingList = (RecyclerView) findViewById(
                R.id.recyclerShoppingList);
        recyclerShoppingList.setHasFixedSize(true);

        final LinearLayoutManager mLayoutManager =
                new LinearLayoutManager(this);
        recyclerShoppingList.setLayoutManager(mLayoutManager);

        List<ShoppingItem> shoppingItemList = ShoppingItem.listAll(ShoppingItem.class);

        shoppingListRecyclerAdapter = new ShoppingListRecyclerAdapter(shoppingItemList, this);

        ItemTouchHelper.Callback callback =
                new ShoppingItemTouchHelperCallback(shoppingListRecyclerAdapter);
        ItemTouchHelper touchHelper = new ItemTouchHelper(callback);
        touchHelper.attachToRecyclerView(recyclerShoppingList);

        recyclerShoppingList.setAdapter(shoppingListRecyclerAdapter);
    }

    /*
    Initializes custom toolbar with logo and menu
     */
    private void setupToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        getSupportActionBar().setTitle(R.string.toolbar_title);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.drawable.shopping_logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);
    }

    /*
    Shows menu icons on toolbar
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    // Handles menu clicks on Toolbar
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case (R.id.miAdd):
                startItemCreateActivity();
        }
        return super.onOptionsItemSelected(item);
    }

    /*
    Adds a shopping item to the list and updates spent
     */
    private void addToShoppingList(Intent data) {
        //Adds shopping item to list
        ShoppingItem shoppingItem = (ShoppingItem) data.getSerializableExtra(ItemCreateActivity.KEY_ITEM);
        shoppingListRecyclerAdapter.addShoppingItem(shoppingItem);
        recyclerShoppingList.scrollToPosition(0);

        //Updates spent if item has been bought
        if (shoppingItem.isBought()) {
            String cost = shoppingItem.getShoppingItemCost();
            updateSpent(Integer.parseInt(cost));
        }
    }

    /*
    Edits a specified shopping item on the list
     */
    private void editShoppingList(Intent data) {
        ShoppingItem itemTemp = (ShoppingItem) data.getSerializableExtra(
                ItemCreateActivity.KEY_ITEM);

        itemToEditHolder.setShoppingItemName(itemTemp.getShoppingItemName());
        itemToEditHolder.setShoppingItemCost(itemTemp.getShoppingItemCost());
        itemToEditHolder.setShoppingItemCat(itemTemp.getShoppingItemCat());
        itemToEditHolder.setBought(itemTemp.isBought());
        itemToEditHolder.setShoppingItemDescrp(itemTemp.getShoppingItemDescrp());

        if (itemToEditPosition != -1) {
            shoppingListRecyclerAdapter.updateShoppingItem(
                    itemToEditPosition, itemToEditHolder);
            itemToEditPosition = -1;
        } else {
            shoppingListRecyclerAdapter.notifyDataSetChanged();
        }
    }

    /*
    Calls activity to create a Shopping Item
     */
    private void startItemCreateActivity() {
        Intent intentStartCreate = new Intent();
        intentStartCreate.setClass(this, ItemCreateActivity.class);
        //clears backstack
        intentStartCreate.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivityForResult(intentStartCreate, REQUEST_CODE_ITEM_CREATE);
    }

    /*
    Calls activity to edit an existing Shopping Item
     */
    public void startItemEditActivity(ShoppingItem itemToEdit, int position) {
        Intent intentStart = new Intent(MainActivity.this,
                ItemCreateActivity.class);
        itemToEditHolder = itemToEdit;
        itemToEditPosition = position;

        intentStart.putExtra(KEY_ITEM_EDIT, itemToEdit);
        startActivityForResult(intentStart, REQUEST_CODE_EDIT);
    }

    /*
    Handles result from activities
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (resultCode) {
            case RESULT_OK:
                if (requestCode == REQUEST_CODE_ITEM_CREATE) {
                    // Handles new item request
                    addToShoppingList(data);
                } else if (requestCode == REQUEST_CODE_EDIT) {
                    // Handles edit item request
                    editShoppingList(data);
                }
                break;
        }
    }

    /*
    Updates amount spent
     */
    public void updateSpent(int cost) {
        spent += cost;
        tvSpent.setText(getString(R.string.cur_spent, spent));
    }
}
