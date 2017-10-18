package edu.carleton.energyapp

import android.content.Context
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter

import edu.carleton.energyapp.Fragments.Tab1
import edu.carleton.energyapp.Fragments.Tab2
import edu.carleton.energyapp.Fragments.Tab3

import edu.carleton.energyapp.buildingCards.BuildingMainActivity

/**
 * Created by Martin on 10/13/17
 */

class SectionsPagerAdapter(fragmentManager: FragmentManager, private val context: Context) : FragmentPagerAdapter(fragmentManager) {

    override fun getItem(position: Int): Fragment? {
        // getItem is called to instantiate the fragment for the given page.
        // Return a PlaceholderFragment (defined as a static inner class below).
        return when (position) {
            0 -> Tab1()
            1 -> Tab2()
            2 -> Tab3()
            else -> null
        }
    }

    override fun getCount(): Int {
        return 3   // 3 total tabs
    }

    override fun getPageTitle(position: Int): CharSequence? {

        return when (position) {
            0 -> context.getString(R.string.tab1)      // "Overview"
            1 -> context.getString(R.string.tab2)      // "Map"
            2 -> context.getString(R.string.tab3)      // "Buildings"
            else -> null
        }
    }
}
