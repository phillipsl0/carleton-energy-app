package com.example.veronica.carletonenergyapp.fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.veronica.carletonenergyapp.R;

/**
 * Created by Veronica on 10/21/17.
 * Holder for initial Cards layout
 */

public class HolderFragment extends Fragment {
    public static String TAG = "HolderFragment";

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public HolderFragment() {
    }

    @SuppressWarnings("unused")
    public static HolderFragment newInstance() {
        HolderFragment fragment = new HolderFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_cards, container, false);
        return view;
    }
}
