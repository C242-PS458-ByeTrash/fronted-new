function previewProfilePic() {
    const fileInput = document.getElementById('profile-pic');
    const profileImg = document.getElementById('profile-img');
    const changePhotoBtn = document.getElementById('change-photo-btn');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImg.src = e.target.result;
            profileImg.style.display = 'block';
            fileInput.style.display = 'none'; // Sembunyikan input file
            changePhotoBtn.style.display = 'inline-block'; // Tampilkan tombol Ubah Foto
        }
        reader.readAsDataURL(file);
    }
}

function changePhoto() {
    const fileInput = document.getElementById('profile-pic');
    const changePhotoBtn = document.getElementById('change-photo-btn');

    fileInput.style.display = 'block'; // Tampilkan input file
    changePhotoBtn.style.display = 'none'; // Sembunyikan tombol Ubah Foto
    fileInput.value = ''; // Reset nilai input file
}

// Add Firebase initialization and data fetching
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDboHC-1yaGw7oVlg9BW555w6X0s6vLMtI",
    authDomain: "byetrash-442808.firebaseapp.com",
    projectId: "byetrash-442808",
    storageBucket: "byetrash-442808.firebasestorage.app",
    messagingSenderId: "913316825970",
    appId: "1:913316825970:web:95bed65a1fd02ba8cc2beb",
    measurementId: "G-29P29DH4YY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('name').innerText = `${userData.firstName} ${userData.lastName}`;
                document.getElementById('email').value = userData.email; // Populate email field
            }
        }).catch((error) => {
            console.error("Error getting document:", error);
        });
    } else {
        console.log("No user is signed in.");
    }
});
