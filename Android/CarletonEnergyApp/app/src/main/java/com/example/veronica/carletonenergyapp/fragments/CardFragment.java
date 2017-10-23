package com.example.veronica.carletonenergyapp.fragments;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.veronica.carletonenergyapp.R;
import com.example.veronica.carletonenergyapp.adapters.CardAdapter;
import com.example.veronica.carletonenergyapp.adapters.TravelListAdapter;

/**
 * Created by Veronica on 10/21/17.
 */

public class CardFragment extends Fragment {
    public static String TAG = "CardFragment";
    private StaggeredGridLayoutManager staggeredGridLayoutManager;
    private LinearLayoutManager layoutManager;
    private TravelListAdapter travelListAdapter;
    private CardAdapter cardListAdapter;
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
        View view = inflater.inflate(R.layout.fragment_cards2, container, false);
        //travelListAdapter = new TravelListAdapter(getContext(), mLi);
        //layoutManager = new StaggeredGridLayoutManager(
        //        1, StaggeredGridLayoutManager.VERTICAL);
        cardListAdapter = new CardAdapter(getContext());
        travelListAdapter = new TravelListAdapter(getContext());
        recyclerView = view.findViewById(R.id.list);
        setUpRecycler();
        return view;
    }

    private void setUpRecycler() {
        layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(travelListAdapter);
    }
}
