package com.example.akumau.ui.materi.subtes

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.akumau.R
import com.example.akumau.data.response.MateriResponseItem
import com.example.akumau.ui.materi.bab.BabActivity

class MateriAdapter(private val list: ArrayList<MateriResponseItem>) : RecyclerView
.Adapter<MateriAdapter.MateriHolder>() {

    class MateriHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(materiResponseItem: MateriResponseItem) {
            with(itemView) {
                val tvItem: TextView = itemView.findViewById(R.id.tvItem)
                tvItem.text = materiResponseItem.subtes
                setOnClickListener {
                    val context = it.context
                    val intent = Intent(context, BabActivity::class.java)
                    intent.putExtra("MATERI_RESPONSE_ITEM", materiResponseItem)
                    context.startActivity(intent)
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MateriHolder {
        val view: View = LayoutInflater.from(parent.context).inflate(
            R.layout.item,
            parent, false
        )
        return MateriHolder(view)
    }

    override fun onBindViewHolder(holder: MateriHolder, position: Int) {
        holder.bind(list[position])
    }

    override fun getItemCount(): Int = list.size
}