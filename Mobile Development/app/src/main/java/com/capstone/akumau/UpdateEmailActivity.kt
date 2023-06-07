package com.capstone.akumau

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Patterns
import android.view.View
import android.widget.Toast
import com.capstone.akumau.databinding.ActivityUpdateEmailBinding
import com.google.firebase.auth.EmailAuthProvider
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException

class UpdateEmailActivity : AppCompatActivity() {
    private lateinit var auth: FirebaseAuth
    private lateinit var updateEmailBinding: ActivityUpdateEmailBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        updateEmailBinding = ActivityUpdateEmailBinding.inflate(layoutInflater)
        super.onCreate(savedInstanceState)
        setContentView(updateEmailBinding.root)
        auth = FirebaseAuth.getInstance()
        val user = auth.currentUser
        updateEmailBinding.layoutVerificationPassword.visibility = View.VISIBLE
        updateEmailBinding.layoutUpdateEmail.visibility = View.GONE
        updateEmailBinding.btnAuth.setOnClickListener {
            val pass = updateEmailBinding.etPassword.text.toString().trim()
            if (pass.isEmpty()) {
                updateEmailBinding.etPassword.error = "Password is empty!"
                updateEmailBinding.etPassword.requestFocus()
                return@setOnClickListener
            }
            //user_credentials
            user.let {
                val userCredential = EmailAuthProvider.getCredential(it?.email!!, pass)
                it.reauthenticate(userCredential).addOnCompleteListener { Task ->
                    when {
                        Task.isSuccessful -> {
                            updateEmailBinding.layoutVerificationPassword.visibility = View.GONE
                            updateEmailBinding.layoutUpdateEmail.visibility = View.VISIBLE
                        }
                        Task.exception is FirebaseAuthInvalidCredentialsException -> {
                            updateEmailBinding.etPassword.error = "Wrong Password!"
                            updateEmailBinding.etPassword.requestFocus()
                        }
                        else -> {
                            Toast.makeText(applicationContext,"${Task.exception?.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
            updateEmailBinding.btnUpdate.setOnClickListener updateEmail@ {
                val email = updateEmailBinding.etEmail.text.toString().trim()
                if (email.isEmpty()) {
                    updateEmailBinding.etEmail.error = "Email is Empty!"
                    updateEmailBinding.etEmail.requestFocus()
                    return@updateEmail
                }
                if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    updateEmailBinding.etEmail.error = "Invalid Email!"
                    updateEmailBinding.etEmail.requestFocus()
                    return@updateEmail
                }
                user?.let {
                    user.updateEmail(email).addOnCompleteListener {
                        if (it.isSuccessful) {
                            Toast.makeText(applicationContext, "Email Updated!", Toast.LENGTH_SHORT).show()
                        } else {
                            Toast.makeText(applicationContext, "${it.exception?.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }
}