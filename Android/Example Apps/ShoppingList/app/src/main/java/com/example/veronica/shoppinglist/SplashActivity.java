package com.example.veronica.shoppinglist;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import java.util.Timer;
import java.util.TimerTask;
import android.content.Intent;

/**
 * Created by Veronica on 11/2/16.
 */

public class SplashActivity extends AppCompatActivity {

    //Duration of wait
    private final int SPLASH_DISPLAY_LENGTH = 3000;

    private Timer timerSplash;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_screen);

        //Timer that starts Main and closes Splash screen
        //after the specified duration
        timerSplash = new Timer();
        timerSplash.schedule(new TimerTask() {
            @Override
            public void run() {
                Intent intentStartList = new Intent();
                intentStartList.setClass(SplashActivity.this, MainActivity.class);
                SplashActivity.this.startActivity(intentStartList);
                timerSplash.cancel();
                SplashActivity.this.finish();
            }
        }, SPLASH_DISPLAY_LENGTH);


    }
}
