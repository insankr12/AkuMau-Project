package com.example.akumau.data.response

import com.google.gson.annotations.SerializedName

data class MateriResponse(

	@field:SerializedName("MateriResponse")
	val materiResponse: List<MateriResponseItem>
)

data class MateriItem(

	@field:SerializedName("judul")
	val judul: String,

	@field:SerializedName("isi")
	val isi: String
)

data class MateriResponseItem(

	@field:SerializedName("materi")
	val materi: List<MateriItem>,

	@field:SerializedName("subtes")
	val subtes: String
)
