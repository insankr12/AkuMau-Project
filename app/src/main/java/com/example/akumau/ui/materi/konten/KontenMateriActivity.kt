package com.example.akumau.ui.materi.konten

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.akumau.R
import com.example.akumau.data.response.MateriItem
import com.example.akumau.databinding.ActivityKontenMateriBinding

class KontenMateriActivity : AppCompatActivity() {
    private lateinit var binding: ActivityKontenMateriBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityKontenMateriBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val item = intent.getParcelableExtra<MateriItem>("MATERI_ITEM")
        binding.apply {
            tvJudul.text = item?.judul
            tvIsi.text = item?.isi
        }
    }
}