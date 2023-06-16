package com.example.akumau.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.akumau.databinding.ActivityMainBinding
import com.example.akumau.ui.latihansoal.SubSoalActivity
import com.example.akumau.ui.materi.subtes.MateriActivity

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