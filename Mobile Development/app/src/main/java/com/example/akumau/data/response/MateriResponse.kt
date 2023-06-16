package com.example.akumau.data.response

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.parcelize.Parcelize

@Parcelize
data class MateriResponse(

    @field:SerializedName("MateriResponse")
    val materiResponse: List<MateriResponseItem>
) : Parcelable

@Parcelize
data class MateriItem(

    @field:SerializedName("judul")
    val judul: String,

    @field:SerializedName("isi")
    val isi: String
) : Parcelable

@Parcelize
data class MateriResponseItem(

    @field:SerializedName("materi")
    val materi: List<MateriItem>,

    @field:SerializedName("subtes")
    val subtes: String
) : Parcelable
