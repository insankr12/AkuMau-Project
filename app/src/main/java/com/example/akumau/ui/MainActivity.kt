package com.example.akumau.ui

import android.content.Intent
import android.os.Bundle
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.akumau.R
import com.example.akumau.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnMateri.setOnClickListener {
            startActivity(Intent(this@MainActivity, MateriActivity::class.java))
        }

        binding.btnLatsol.setOnClickListener {
            startActivity(Intent(this@MainActivity, SubSoalActivity::class.java))
        }
    }
}