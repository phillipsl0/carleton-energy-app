package com.example.veronica.carletonenergyapp;

import android.net.Uri;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.widget.TextView;

import com.example.veronica.carletonenergyapp.fragments.BlankFragment;
import com.example.veronica.carletonenergyapp.fragments.BuildingFragment;
import com.example.veronica.carletonenergyapp.fragments.CardFragment;
import com.example.veronica.carletonenergyapp.fragments.CardsFragment;

import org.jetbrains.annotations.NotNull;

public class MainActivity extends AppCompatActivity
        implements BlankFragment.OnFragmentInteractionListener,
        CardsFragment.OnListFragmentInteractionListener {

    private TextView mTextMessage;
    private BottomNavigationView bottomNavigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setUpBottomNav();
        mTextMessage = (TextView) findViewById(R.id.message);
    }

    private void setUpBottomNav() {
        bottomNavigationView = findViewById(R.id.navigation);

        BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
                = new BottomNavigationView.OnNavigationItemSelectedListener() {

            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                Fragment fragment = null;
                String tag;

                switch (item.getItemId()) {
                    case R.id.nav_bottom_home:
                        mTextMessage.setText(R.string.title_home);
                        return true;
                    // Cards Fragment
                    case R.id.nav_bottom_cards:
                        mTextMessage.setText(R.string.title_dashboard);
                        tag = CardFragment.TAG;
                        Log.d("FRAGMENT", "Tag fragment: " + tag);
                        fragment = getSupportFragmentManager().findFragmentByTag(tag);
                        if (fragment == null) {
                            Log.d("FRAGMENT", "Initializing: " + tag);
                            fragment = new CardFragment();
                        }
                        break;
                    case R.id.bottom_nav_empty_frag:
                        mTextMessage.setText(R.string.title_notifications);
                        tag = BuildingFragment.TAG;
                        fragment = getSupportFragmentManager().findFragmentByTag(tag);
                        if (fragment == null) {
                            fragment = new BuildingFragment();
                        }
                        break;
                }
                Log.d("FRAGMENT", "Beginning transaction");
                getSupportFragmentManager().beginTransaction()
                        .replace(R.id.main_fragment_placeholder, fragment)
                        .addToBackStack(null)
                        .commit();
                Log.d("FRAGMENT", "Transaction finished");
                return true;
            }
        };
        bottomNavigationView.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
    }

    /*
    Method used to communicate between fragments
     */
    @Override
    public void onFragmentInteraction(@NotNull Uri uri) {

    }
}
