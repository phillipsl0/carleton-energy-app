package com.example.veronica.carletonenergyapp.fragments

import android.content.Context
import android.net.Uri
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.app.ActivityCompat
import android.support.v4.app.ActivityOptionsCompat
import android.support.v4.app.Fragment
import android.support.v7.widget.StaggeredGridLayoutManager
import android.widget.ImageView
import android.widget.LinearLayout
import android.support.v4.util.Pair
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.*
import com.example.veronica.carletonenergyapp.DetailActivity

import com.example.veronica.carletonenergyapp.R
import com.example.veronica.carletonenergyapp.adapters.TravelListAdapter
import kotlinx.android.synthetic.main.toolbar.*

/**
 * A simple [Fragment] subclass.
 * Activities that contain this fragment must implement the
 * [CardsFragment.OnFragmentInteractionListener] interface
 * to handle interaction events.
 * Use the [CardsFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class CardsFragment : Fragment() {
    lateinit private var menu: Menu
    lateinit private var staggeredLayoutManager: StaggeredGridLayoutManager
    lateinit private var adapter: TravelListAdapter
    private var isListView: Boolean = false
    private var mListener: OnListFragmentInteractionListener? = null

    interface OnListFragmentInteractionListener {
        fun onFragmentInteraction(uri: Uri)
    }

    companion object {
        @JvmField
        val TAG = "CardsFragment"

        fun newInstance(): CardsFragment {
            return CardsFragment()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    private val onItemClickListener = object: TravelListAdapter.OnItemClickListener {
        override fun onItemClick(view: View, position: Int) {

            // 1
            val transitionIntent = DetailActivity.newIntent(view.context, position)
            val placeImage = view.findViewById<ImageView>(R.id.placeImage)
            val placeNameHolder = view.findViewById<LinearLayout>(R.id.placeNameHolder)

            // 2
            val navigationBar = view.findViewById<View>(android.R.id.navigationBarBackground)
            val statusBar = view.findViewById<View>(android.R.id.statusBarBackground)

            val imagePair = Pair.create(placeImage as View, "tImage")
            val holderPair = Pair.create(placeNameHolder as View, "tNameHolder")

             3
            val navPair = Pair.create(navigationBar, Window.NAVIGATION_BAR_BACKGROUND_TRANSITION_NAME)
            val statusPair = Pair.create(statusBar, Window.STATUS_BAR_BACKGROUND_TRANSITION_NAME)
            val toolbarPair = Pair.create(toolbar as View, "tActionBar")

             4
            val pairs = mutableListOf(imagePair, holderPair, statusPair, toolbarPair)
            if (navigationBar != null && navPair != null) {
                pairs += navPair
            }

            // 5
            val options = ActivityOptionsCompat.makeSceneTransitionAnimation(activity,
                    *pairs.toTypedArray())
            ActivityCompat.startActivity(context, transitionIntent, options.toBundle())


//            val intent = DetailActivity.newIntent(this@MainActivity, position)
//
//            val placeImage = view.findViewById<ImageView>(R.id.placeImage)
//            val placeNameHolder = view.findViewById<LinearLayout>(R.id.placeNameHolder)
//
//            val imagePair = Pair.create(placeImage as View, "tImage")
//            val holderPair = Pair.create(placeNameHolder as View, "tNameHolder")
//
//            val options = ActivityOptionsCompat.makeSceneTransitionAnimation(this@MainActivity, imagePair, holderPair)
//            ActivityCompat.startActivity(this@MainActivity, intent, options.toBundle())

            // startActivity(DetailActivity.newIntent(this@MainActivity, position))
            // Toast.makeText(this@MainActivity, "Clicked " + position, Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreateView(inflater: LayoutInflater?, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val view: View = inflater!!.inflate(R.layout.fragment_cards2, container, false)
        val activity = activity
        isListView = true
        // Set the adapter
        if (view is RecyclerView) {
            val context = view.context
//            view.setHasFixedSize(true);
//            staggeredLayoutManager = StaggeredGridLayoutManager(
//                    1,StaggeredGridLayoutManager.VERTICAL)
//            view.layoutManager = staggeredLayoutManager
//
//            adapter = TravelListAdapter(this)
//            view.adapter = adapter
//            adapter.setOnItemClickListener(onItemClickListener)

            staggeredLayoutManager = StaggeredGridLayoutManager(
                    1,StaggeredGridLayoutManager.VERTICAL)
            view.layoutManager = LinearLayoutManager(context)

            view.adapter = TravelListAdapter(context, mListener)
            //adapter.setOnItemClickListener(onItemClickListener)

        }
        // list is ID of recycler view list in R.layout.fragment_cards2

        //setUpActionBar()
        return view
    }

//    private fun setUpActionBar() {
//        setSupportActionBar(toolbar)
//        supportActionBar?.setDisplayHomeAsUpEnabled(false)
//        supportActionBar?.setDisplayShowTitleEnabled(true)
//        supportActionBar?.elevation =7.0f
//
//    }
//
//    override fun onCreateOptionsMenu(menu: Menu): Boolean {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        menuInflater.inflate(R.menu.menu_main, menu)
//        this.menu = menu
//        return true
//    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val id = item.itemId
        if (id == R.id.action_toggle) {
            toggle()
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    private fun toggle() {
        if (isListView) {
            staggeredLayoutManager.spanCount = 2
            showGridView()
        } else {
            staggeredLayoutManager.spanCount = 1
            showListView()
        }
    }

    private fun showListView() {
        val item = menu.findItem(R.id.action_toggle)
        item.setIcon(R.drawable.ic_action_grid)
        item.title = getString(R.string.show_as_grid)
        isListView = true
    }

    private fun showGridView() {
        val item = menu.findItem(R.id.action_toggle)
        item.setIcon(R.drawable.ic_action_list)
        item.title = getString(R.string.show_as_list)
        isListView = false
    }



// TODO: Rename method, update argument and hook method into UI event
    fun onButtonPressed(uri: Uri) {
        if (mListener != null) {
            mListener!!.onFragmentInteraction(uri)
        }
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        if (context is OnListFragmentInteractionListener) {
            mListener = context
        } else {
            throw RuntimeException(context!!.toString() + " must implement OnFragmentInteractionListener")
        }
    }

    override fun onDetach() {
        super.onDetach()
        mListener = null
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     *
     *
     * See the Android Training lesson [Communicating with Other Fragments](http://developer.android.com/training/basics/fragments/communicating.html) for more information.
     */
}// Required empty public constructor
