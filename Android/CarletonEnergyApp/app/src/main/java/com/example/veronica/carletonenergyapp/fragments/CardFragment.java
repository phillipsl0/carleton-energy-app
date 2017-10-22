package com.example.veronica.carletonenergyapp.fragments;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.veronica.carletonenergyapp.R;
import com.example.veronica.carletonenergyapp.adapters.TravelListAdapter;

/**
 * Created by Veronica on 10/21/17.
 */

public class CardFragment extends Fragment {
    public static String TAG = "CardFragment";
    private StaggeredGridLayoutManager staggeredGridLayoutManager;
    private TravelListAdapter travelListAdapter;
    private RecyclerView recyclerView;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public CardFragment() {
    }

    @SuppressWarnings("unused")
    public static CardFragment newInstance() {
        CardFragment fragment = new CardFragment();
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
        //travelListAdapter = new TravelListAdapter(getContext(), mLi);
        staggeredGridLayoutManager = new StaggeredGridLayoutManager(
                1, StaggeredGridLayoutManager.VERTICAL);
        return view;
    }
}
