package com.example.akumau.data.retrofit

import com.example.akumau.data.response.MateriResponse
import retrofit2.Call
import retrofit2.http.GET

interface ApiService {
    @GET("materi")
    fun getMateri(): Call<List<MateriResponse>>
}