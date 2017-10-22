package com.example.veronica.carletonenergyapp.fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.veronica.carletonenergyapp.R;

/**
 * A fragment.
 */
public class BuildingFragment extends Fragment {
    public static String TAG = "BuildingFragment";

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public BuildingFragment() {
    }

    @SuppressWarnings("unused")
    public static BuildingFragment newInstance(int columnCount) {
        BuildingFragment fragment = new BuildingFragment();
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
        View view = inflater.inflate(R.layout.fragment_building, container, false);
        return view;
    }
}
