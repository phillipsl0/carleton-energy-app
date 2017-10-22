package com.example.veronica.carletonenergyapp

/**
 * Created by Veronica on 10/21/17 taken from Martin's code.
 */


import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.Animatable
import android.graphics.drawable.ColorDrawable
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.graphics.Palette
import android.transition.Transition
import android.util.Log
import android.view.View
import android.view.ViewAnimationUtils
import android.view.animation.AlphaAnimation
import android.view.animation.Animation
import android.view.inputmethod.InputMethodManager
import android.widget.*
import com.example.veronica.carletonenergyapp.data.Place
import com.example.veronica.carletonenergyapp.data.PlaceData
import java.util.ArrayList
import kotlinx.android.synthetic.main.activity_detail.*

class DetailActivity : AppCompatActivity(), View.OnClickListener {

    companion object {
        val EXTRA_PARAM_ID = "place_id"

        fun newIntent(context: Context, position: Int): Intent {
            val intent = Intent(context, DetailActivity::class.java)
            intent.putExtra(EXTRA_PARAM_ID, position)
            return intent
        }
    }

    lateinit private var inputManager: InputMethodManager
    lateinit private var place: Place
    lateinit private var todoList: ArrayList<String>
    lateinit private var toDoAdapter: ArrayAdapter<*>

    private var isEditTextVisible: Boolean = false
    private var defaultColor: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)

        setupValues()
        setUpAdapter()
        loadPlace()
        windowTransition()
        getPhoto()
    }

    private fun setupValues() {
        Log.d("DETAIL_ACTIVITY", "Setting up values!")
        place = PlaceData.placeList()[intent.getIntExtra(EXTRA_PARAM_ID, 0)]
        addButton.setOnClickListener(this)
        defaultColor = ContextCompat.getColor(this, R.color.colorPrimaryDark)
        inputManager = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        revealView.visibility = View.INVISIBLE
        isEditTextVisible = false
    }

    private fun setUpAdapter() {
        todoList = ArrayList()
        toDoAdapter = ArrayAdapter(this, R.layout.row_todo, todoList)
        activitiesList.adapter = toDoAdapter as ArrayAdapter<String>
    }

    private fun loadPlace() {
        placeTitle.text = place.name
        placeImage.setImageResource(place.getImageResourceId(this))
    }

    private fun windowTransition() {
        window.enterTransition.addListener(object : Transition.TransitionListener {

            override fun onTransitionEnd(transition: Transition) {

                // Can change duration of onClick animation, but not on the back animation
                addButton.animate().alpha(1.0f)//.duration = 1000
                window.enterTransition.removeListener(this)
            }

            override fun onTransitionResume(p0: Transition) {}
            override fun onTransitionPause(p0: Transition) {}
            override fun onTransitionCancel(p0: Transition) {}
            override fun onTransitionStart(p0: Transition) {}

        })
    }

    private fun addToDo(todo: String) {
        todoList.add(todo)
    }

    private fun getPhoto() {
        val photo = BitmapFactory.decodeResource(resources, place.getImageResourceId(this))
        colorize(photo)
    }

    private fun colorize(photo: Bitmap) {
        val palette = Palette.from(photo).generate()
        applyPalette(palette)
    }

    private fun applyPalette(palette: Palette) {
        window.setBackgroundDrawable(ColorDrawable(palette.getDarkMutedColor(defaultColor)))
        placeNameHolder.setBackgroundColor(palette.getMutedColor(defaultColor))   // Same as CardView
        revealView.setBackgroundColor(palette.getDarkVibrantColor(defaultColor))
    }

    override fun onClick(v: View) {
        when (v.id) {
            R.id.addButton -> if (!isEditTextVisible) {
                revealEditText(revealView)
                todoText.requestFocus()
                inputManager.showSoftInput(todoText, InputMethodManager.SHOW_IMPLICIT)

                addButton.setImageResource(R.drawable.icn_morph)
                val animatable = addButton.drawable as Animatable
                animatable.start()

            } else {
                if (todoText.text.isNotEmpty()) {
                    addToDo(todoText.text.toString())
                    toDoAdapter.notifyDataSetChanged()
                }

                inputManager.hideSoftInputFromWindow(todoText.windowToken, 0)
                hideEditText(revealView)

                addButton.setImageResource(R.drawable.icn_morph_reverse)
                val animatable = addButton.drawable as Animatable
                animatable.start()
            }
        }
    }

    private fun revealEditText(view: LinearLayout) {
        val cx = view.right - 135
        val cy = view.bottom - 30
        val finalRadius = Math.max(view.width, view.height)
        val animation = ViewAnimationUtils.createCircularReveal(view, cx, cy, 0f, finalRadius.toFloat())

        view.visibility = View.VISIBLE
        isEditTextVisible = true
        animation.start()
    }

    private fun hideEditText(view: LinearLayout) {
        val cx = view.right - 135
        val cy = view.bottom - 30
        val initialRadius = view.width
        val anim = ViewAnimationUtils.createCircularReveal(view, cx, cy, initialRadius.toFloat(), 0f)

        anim.addListener(object: AnimatorListenerAdapter() {
            override fun onAnimationEnd(animation: Animator) {
                super.onAnimationEnd(animation)
                view.visibility = View.INVISIBLE
            }
        })

        isEditTextVisible = false
        anim.start()

    }

    override fun onBackPressed() {
        val alphaAnimation = AlphaAnimation(1.0f, 0.0f)
        alphaAnimation.duration = 100
        addButton.startAnimation(alphaAnimation)
        alphaAnimation.setAnimationListener(object : Animation.AnimationListener {
            override fun onAnimationStart(animation: Animation) {

            }

            override fun onAnimationEnd(animation: Animation) {
                addButton.visibility = View.GONE
                finishAfterTransition()
            }

            override fun onAnimationRepeat(animation: Animation) {

            }
        })
    }
}

