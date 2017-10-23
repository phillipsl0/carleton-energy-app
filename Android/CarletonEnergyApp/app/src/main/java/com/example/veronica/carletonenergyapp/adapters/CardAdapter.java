package com.example.veronica.carletonenergyapp.adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.veronica.carletonenergyapp.R;
import com.example.veronica.carletonenergyapp.data.Place;
import com.example.veronica.carletonenergyapp.data.PlaceData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Veronica on 10/22/17.
 */

public class CardAdapter extends RecyclerView.Adapter<CardAdapter.ViewHolder> {
    private Context context;
    private List<Place> placeList;

    public CardAdapter(Context context) {
        this.context = context;
        // Populate cards
        this.placeList = PlaceData.INSTANCE.placeList();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.row_places, parent, false);
        ViewHolder vh = new ViewHolder(v);
        return vh;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
        return placeList.size();
    }

    /*
    Creates view for a single place display
     */
    static class ViewHolder extends RecyclerView.ViewHolder {
        private ViewHolder(View cardView) {
            super(cardView);
        }
    }
}
