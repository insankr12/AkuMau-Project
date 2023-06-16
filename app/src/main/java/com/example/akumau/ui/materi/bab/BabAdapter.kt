package com.example.akumau.ui.materi.bab

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.akumau.R
import com.example.akumau.data.response.MateriItem
import com.example.akumau.ui.materi.konten.KontenMateriActivity

class BabAdapter(private val list: ArrayList<MateriItem>) : RecyclerView
.Adapter<BabAdapter.BabHolder>() {

    class BabHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(materiItem: MateriItem) {
            with(itemView) {
                val tvItem: TextView = itemView.findViewById(R.id.tvItem)
                tvItem.text = materiItem.judul
                setOnClickListener {
                    val context = it.context
                    val intent = Intent(context, KontenMateriActivity::class.java)
                    intent.putExtra("MATERI_ITEM", materiItem)
                    context.startActivity(intent)
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BabHolder {
        val view: View = LayoutInflater.from(parent.context).inflate(
            R.layout.item,
            parent, false
        )
        return BabHolder(view)
    }

    override fun onBindViewHolder(holder: BabHolder, position: Int) {
        holder.bind(list[position])
    }

    override fun getItemCount(): Int = list.size
}