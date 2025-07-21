import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("You must be logged in to submit the quiz");
    window.location.href = "../../index.html";
  } else {
    document.getElementById("quiz-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const answers = {
        q1: document.getElementById("q1").value,
        q2: document.getElementById("q2").value,
        timestamp: new Date()
      };

      try {
        await setDoc(doc(db, "responses", `${user.uid}-numberSystem-day1`), answers);
        alert("✅ Quiz submitted successfully!");
        window.location.href = "../../success.html";
      } catch (error) {
        console.error("Error saving response:", error);
        alert("Something went wrong!");
      }
    });
  }
});
