package com.example.veronica.shoppinglist;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckedTextView;
import android.widget.EditText;
import android.widget.Spinner;

import com.example.veronica.shoppinglist.data.ShoppingItem;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.OnEditorAction;
import butterknife.OnItemSelected;
import butterknife.OnTouch;

/**
 * Created by Veronica on 11/4/16.
 */

public class ItemCreateActivity extends AppCompatActivity {
    @BindView(R.id.etCost)
    EditText etCost;
    @BindView(R.id.etName)
    EditText etName;
    @BindView(R.id.etDescrp)
    EditText etDescrp;
    @BindView(R.id.ctBought)
    CheckedTextView ctBought;
    @BindView(R.id.spinCat)
    Spinner spinCat;
    @BindView(R.id.btnAdd)
    Button btnAdd;

    public static final String KEY_ITEM = "KEY_ITEM";

    private ShoppingItem shoppingItemEdit = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.shopping_item_create);

        ButterKnife.bind(this);
        loadCategoryTypes();

        // Handles to edit an item instead of creating
        if (getIntent() != null && getIntent().hasExtra(MainActivity.KEY_ITEM_EDIT)) {
            // Changes button text to update
            btnAdd.setText(R.string.btn_update);
            shoppingItemEdit = (ShoppingItem) getIntent().getSerializableExtra(MainActivity.KEY_ITEM_EDIT);
            setEditItemValues(shoppingItemEdit);
        } else {
            // Changes back to add if not editing
            btnAdd.setText(R.string.btn_add);
        }
    }
    /*
    Handles checking if an item has been bought or not
     */
    @OnClick(R.id.ctBought)
    public void saveClickHandler(CheckedTextView ctBought) {
        if (!ctBought.isChecked()) {
            ctBought.setChecked(true);
        } else {
            ctBought.setChecked(false);
        }
    }

    /*
    Creates an adapter for the default spinner layout.
     */
    private void loadCategoryTypes() {
        //Default adapter
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.cat_array, android.R.layout.simple_dropdown_item_1line);
        //Specify layout to use
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinCat.setAdapter(adapter);
    }

    /*
    Returns result from creation or editing of a shopping item
     */
    @OnClick(R.id.btnAdd)
    public void saveClickHandler(Button btnAdd) {
        if (validateInput()) {
            Intent resultIntent = new Intent();
            ShoppingItem shoppingItem = null;

            if (shoppingItemEdit == null) {
                //if it is a new item, initialize
                shoppingItem = new ShoppingItem();
            } else {
                // item is not new, set values
                shoppingItem = shoppingItemEdit;
            }
            setItemValues(shoppingItem);
            resultIntent.putExtra(KEY_ITEM, shoppingItem);
            setResult(RESULT_OK, resultIntent);
            finish();
        }
    }

    //Can fetch activity results when it ends
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }

    /*
    Helper method to ensure no mandatory input field is blank
     */
    private boolean validateInput() {
        boolean valid = true;

        if (etName.getText().toString().equals("")) {
            etName.setError(getString(R.string.err_name));
            valid = false;
        }
        if (etCost.getText().toString().equals("")){
            etCost.setError(getString(R.string.err_price));
            valid = false;
        }
        return valid;
    }

    /*
    Helper function to set values to a new item
     */
    private void setItemValues(ShoppingItem shoppingItem) {
        shoppingItem.setShoppingItemName(etName.getText().toString());
        shoppingItem.setShoppingItemCost(etCost.getText().toString());
        shoppingItem.setShoppingItemDescrp(etDescrp.getText().toString());
        shoppingItem.setBought(ctBought.isChecked());
        shoppingItem.setShoppingItemCat(spinCat.getSelectedItemPosition());
    }

    /*
    Helper function to update values of a pre-existing item
     */
    private void setEditItemValues(ShoppingItem shoppingItem) {
        etName.setText(shoppingItem.getShoppingItemName());
        etDescrp.setText(shoppingItem.getShoppingItemDescrp());
        ctBought.setChecked(shoppingItem.isBought());
        spinCat.setSelection(shoppingItem.getShoppingItemCat());
        etCost.setText(shoppingItem.getShoppingItemCost());
    }
}
