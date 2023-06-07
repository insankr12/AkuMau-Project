package com.capstone.akumau

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import com.capstone.akumau.databinding.ActivityUpdatePasswordBinding
import com.google.firebase.auth.EmailAuthProvider
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException

class UpdatePasswordActivity : AppCompatActivity() {
    private lateinit var auth: FirebaseAuth
    private lateinit var updatePasswordBinding: ActivityUpdatePasswordBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        updatePasswordBinding = ActivityUpdatePasswordBinding.inflate(layoutInflater)
        super.onCreate(savedInstanceState)
        setContentView(updatePasswordBinding.root)
        auth = FirebaseAuth.getInstance()
        val user = auth.currentUser
        updatePasswordBinding.layoutVerificationPassword.visibility = View.VISIBLE
        updatePasswordBinding.layoutUpdatePassword.visibility = View.GONE
        updatePasswordBinding.btnAuth.setOnClickListener {
            val pass = updatePasswordBinding.etPassword.text.toString().trim()
            if (pass.isEmpty()) {
                updatePasswordBinding.etPassword.error = "Pass is Empty!"
                updatePasswordBinding.etPassword.requestFocus()
                return@setOnClickListener
            }
            //User_credential
            user.let {
                val userCredential = EmailAuthProvider.getCredential(it?.email!!, pass)
                it.reauthenticate(userCredential).addOnCompleteListener { Task ->
                    when {
                        Task.isSuccessful -> {
                            updatePasswordBinding.layoutVerificationPassword.visibility = View.GONE
                            updatePasswordBinding.layoutUpdatePassword.visibility = View.VISIBLE
                        }
                        Task.exception is FirebaseAuthInvalidCredentialsException -> {
                            updatePasswordBinding.etPassword.error = "Wrong Password!"
                            updatePasswordBinding.etPassword.requestFocus()
                        }
                        else -> {
                            Toast.makeText(applicationContext, "${Task.exception?.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
            updatePasswordBinding.btnUpdate.setOnClickListener updatePassword@ {
                val newPass = updatePasswordBinding.etNewPassword.text.toString().trim()
                val newPassConfirm = updatePasswordBinding.etNewPasswordConfirm.text.toString().trim()
                if (newPass.isEmpty()) {
                    updatePasswordBinding.etNewPassword.error = "Password is Empty"
                    updatePasswordBinding.etNewPassword.requestFocus()
                    return@updatePassword
                }
                if (newPass.length <  8) {
                    updatePasswordBinding.etNewPassword.error = "The password must consist of 8 characters or more!"
                    updatePasswordBinding.etNewPassword.requestFocus()
                }
                if (newPass != newPassConfirm) {
                    updatePasswordBinding.etNewPasswordConfirm.error = "The passwords didn't match"
                    updatePasswordBinding.etNewPasswordConfirm.requestFocus()
                    return@updatePassword
                }
                user?.let {
                    user.updatePassword(newPass).addOnCompleteListener {
                        if (it.isSuccessful) {
                            Toast.makeText(applicationContext, "Password was Changed!", Toast.LENGTH_SHORT).show()
                        } else {
                            Toast.makeText(applicationContext, "${it.exception?.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }
}