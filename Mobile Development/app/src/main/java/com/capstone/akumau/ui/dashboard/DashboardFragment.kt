package com.capstone.akumau.ui.dashboard

import android.annotation.SuppressLint
import android.app.Activity.RESULT_OK
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.capstone.akumau.LoginActivity
import com.capstone.akumau.UpdateEmailActivity
import com.capstone.akumau.UpdatePasswordActivity
import com.capstone.akumau.databinding.FragmentDashboardBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.UserProfileChangeRequest
import com.google.firebase.auth.ktx.userProfileChangeRequest
import com.google.firebase.storage.FirebaseStorage
import com.squareup.picasso.Picasso
import java.io.ByteArrayOutputStream

class DashboardFragment : Fragment() {

    private var _binding: FragmentDashboardBinding? = null
    private lateinit var auth: FirebaseAuth
    private lateinit var imgUri : Uri
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val dashboardViewModel =
            ViewModelProvider(this).get(DashboardViewModel::class.java)

        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        auth = FirebaseAuth.getInstance()
        val user = auth.currentUser
        if (user != null) {
            if (user.photoUrl != null) {
                Picasso.get().load(user.photoUrl).into(binding.ivProfile)
            } else {
                Picasso.get().load("https://picsum.photos/seed/picsum/300/300").into(binding.ivProfile)
            }
            binding.etName.setText(user.displayName)
            binding.etEmail.setText(user.email)
            if (user.isEmailVerified) {
                binding.ivVerified.visibility = View.VISIBLE
                binding.ivUnverified.visibility = View.INVISIBLE
            } else {
                binding.ivUnverified.visibility = View.VISIBLE
                binding.ivVerified.visibility = View.INVISIBLE
            }
        }
        binding.btnUpdate.setOnClickListener {
            val image = when {
                ::imgUri.isInitialized -> imgUri
                user?.photoUrl == null -> Uri.parse("https://picsum.photos/seed/picsum/300/300")
                else -> user.photoUrl
            }
            val name = binding.etName.text.toString().trim()
            if (name.isEmpty()) {
                binding.etName.error = "Nama harus diisi!"
                binding.etName.requestFocus()
                return@setOnClickListener
            }
            UserProfileChangeRequest.Builder()
                .setDisplayName(name)
                .setPhotoUri(image)
                .build().also {
                    user?.updateProfile(it)?.addOnCompleteListener { Task ->
                        if (Task.isSuccessful) {
                            Toast.makeText(activity, "Profil berhasil diperbarui!", Toast.LENGTH_SHORT).show()
                        } else {
                            Toast.makeText(activity, "${Task.exception?.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
        }
        binding.btnVerification.setOnClickListener {
            user?.sendEmailVerification()?.addOnCompleteListener {
                if (it.isSuccessful) {
                    Toast.makeText(activity, "Email verifikasi terkirim!", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(activity, "${it.exception?.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
        binding.btnUpdateEmail.setOnClickListener {
            Intent(context, UpdateEmailActivity::class.java).also {
                startActivity(it)
            }
        }
        binding.btnUpdatePassword.setOnClickListener {
            Intent(context, UpdatePasswordActivity::class.java).also {
                startActivity(it)
            }
        }
        binding.btnLogout.setOnClickListener {
            auth.signOut()
            Intent(context, LoginActivity::class.java).also {
                startActivity(it)
            }
        }
        binding.ivProfile.setOnClickListener {
            intentCamera()
        }
    }

    @SuppressLint("QueryPermissionsNeeded")
    private fun intentCamera() {
        Intent(MediaStore.ACTION_IMAGE_CAPTURE).also { intent ->
            activity?.packageManager?.let {
                intent.resolveActivity(it).also {
                    startActivityForResult(intent, REQUEST_CAMERA)
                }
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CAMERA && resultCode == RESULT_OK) {
            val imgBitmap = data?.extras?.get("data") as Bitmap
            uploadImgBitmap(imgBitmap)
        }
    }

    private fun uploadImgBitmap(imgBitmap: Bitmap) {
        val baos = ByteArrayOutputStream()
        val ref =
            FirebaseStorage.getInstance().reference.child("img_profile/${FirebaseAuth.getInstance().currentUser?.uid}")
        imgBitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos)
        val img = baos.toByteArray()
        ref.putBytes(img)
            .addOnCompleteListener {
                if (it.isSuccessful)
                    ref.downloadUrl.addOnCompleteListener { Task ->
                        Task.result?.let { Uri ->
                            imgUri = Uri
                            binding.ivProfile.setImageBitmap(imgBitmap)
                        }
                    }
            }
    }
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
    companion object {
        const val REQUEST_CAMERA = 100
    }
}