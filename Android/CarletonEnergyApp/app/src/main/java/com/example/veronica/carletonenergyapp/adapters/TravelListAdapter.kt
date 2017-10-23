package com.example.veronica.carletonenergyapp.adapters


import android.content.Context
import android.graphics.BitmapFactory
import android.support.v4.content.ContextCompat
import android.support.v7.graphics.Palette
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import com.example.veronica.carletonenergyapp.R
import com.example.veronica.carletonenergyapp.data.PlaceData
import com.example.veronica.carletonenergyapp.fragments.CardsFragment
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.row_places.view.*

/**
 * Created by Martin on 10/2/17
 */

// 1
class TravelListAdapter(private var context: Context) : RecyclerView.Adapter<TravelListAdapter.ViewHolder>() {

    lateinit var itemClickListener: OnItemClickListener
    override fun getItemCount() = PlaceData.placeList().size

    // Creates individual items
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = LayoutInflater.from(parent.context)
                .inflate(R.layout.row_places, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val place = PlaceData.placeList()[position]
        holder.itemView.placeName.text = place.name
        Picasso.with(context).load(place.getImageResourceId(context)).into(holder.itemView.placeImage)

        val photo = BitmapFactory.decodeResource(context.resources, place.getImageResourceId(context))
        Palette.from(photo).generate { palette ->
            val bgColor = palette.getMutedColor(ContextCompat.getColor(context, android.R.color.black))
            holder.itemView.placeNameHolder.setBackgroundColor(bgColor)
        }
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView), View.OnClickListener {

        init {
            itemView.placeHolder.setOnClickListener(this)
        }

        override fun onClick(view: View) = itemClickListener.onItemClick(itemView, adapterPosition)
    }

    interface OnItemClickListener {
        fun onItemClick(view: View, position: Int)
    }

    fun setOnItemClickListener(itemClickListener: OnItemClickListener) {
        this.itemClickListener = itemClickListener
    }
}