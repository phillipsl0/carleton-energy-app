package edu.carleton.energyapp.Fragments

//import android.app.Fragment;

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import edu.carleton.energyapp.R

/**
 * Created by Martin on 10/13/17
 */

class Tab3 : Fragment() {

    override fun onCreateView(inflater: LayoutInflater?, container: ViewGroup?, savedInstanceState: Bundle?): View? {

        return inflater!!.inflate(R.layout.tab3, container, false)
    }
}
