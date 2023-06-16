package com.example.akumau.ui.materi.subtes

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.akumau.R
import com.example.akumau.data.response.MateriResponseItem
import com.example.akumau.data.retrofit.ApiConfig
import com.example.akumau.databinding.ActivityMateriBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MateriActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMateriBinding
    private val list = ArrayList<MateriResponseItem>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMateriBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.rvMateri.setHasFixedSize(true)
        binding.rvMateri.layoutManager = LinearLayoutManager(this)

        val client = ApiConfig.getApiService().getMateri()
        client.enqueue(object : Callback<ArrayList<MateriResponseItem>> {
            override fun onResponse(
                call: Call<ArrayList<MateriResponseItem>>,
                response: Response<ArrayList<MateriResponseItem>>
            ) {
                response.body()?.let { list.addAll(it) }
                val adapter = MateriAdapter(list)
                binding.rvMateri.adapter = adapter
            }

            override fun onFailure(call: Call<ArrayList<MateriResponseItem>>, t: Throwable) {

            }
        })
    }
}