const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    // Check if userMessage matches any local responses
  const localResponse = getLocalResponse(userMessage);

  if (localResponse) {
    messageElement.textContent = localResponse;
  } else {

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again, or check your spellings.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));

}

};

const getLocalResponse = (userMessage) => {
    // Add your local response logic here
    if (userMessage.toLowerCase().includes("courses", "available")) {
      return "The courses available in NKFI are in two categories which are the Short Term Courses which last a duration of six(6) months and Long Term Courses which last a duration of two(2) years.\nFor more details about the categories of the courses type 'More' ";
    } else if (userMessage.toLowerCase().includes("more")) {
      return "For the Long Term Courses we have:\nComputer Software Engineering\nNetwork and System Security\nElectrical Electronics Technology\nWelding and Fabrication\nNVC in Mechatronics(1 year)\n\nFor the Short Term Courses we have:\nIn the Electrical Electronics Department:\nElecrical Installations, Repairs and Maintenance\nElecrical Machine Practice and Construction\nConsumer Electronics and Repairs\nPLC Programming Logic and Control Practice(Industrial Electricity and Control)\nBasic Electricity\nCCTV Camera Installation and Maintenance\n\nWelding and Fabrication Department:\nArc Welding\nSpecial Welding\nPlumbing and Fittings\n\nInformation Communication Technology Department:\nBusiness Application\nComputer Hardware and Networking\nWeb Design\nCyber Security\n\nAutomobile Department:\nAutomotive Electrical, Electronics and Chassis Design";
    } else if (userMessage.toLowerCase().includes("admission", "requirements", 'requirement')) {
        return "Five(5) credit level passes in GCE 'O' level or Senior Secondary School Certificate(SSCE) at no more than two sittings. The five subjects must include Mathematics, Physics, Chemistry, English Language and any other subjects with not less than 150 in your Jamb score.\nNational Vocational Certificate in (NVC, Final) in Computer Studies from an approved Vocational Enterprise Institution(VEI).";
    } else if (userMessage.toLowerCase().includes("accommodation")) {
        return "Unfortunately facilities for accommodation has not been made available yet";
    } else if (userMessage.toLowerCase().includes("located", "location", "address")) {
        return "RPVR+834, 260101, Lokoja, Kogi State";
    } else if (userMessage.toLowerCase().includes("name")) {
        return "Nigeria-Korean Friendship Institute for Vocational and Advanced Technology";
    } else if (userMessage.toLowerCase().includes("apply", "application", "admission")) {
        return "These are the steps to take when applying for admission into NKFI:\nMake sure you have your Jamb result with not less than 150.\nPurchase NKFI Application form.\nSubmit the application form with required documents to NKFI.\nScreening of Documents.\nPost JAMB Examination(PUTME).\nRelease of Result/Admission.\nRegistration.";
    } else if (userMessage.toLowerCase().includes("who", "created")) {
        return "I was created by Esther Olamide";
    } else if (userMessage.toLowerCase().includes("fees")) {
        return "The school fees for long term courses cost #51,000 while that of Short term cost #70,000";
    } else if (userMessage.toLowerCase().includes("form")) {
        return "It cost #5000";
    }
     else {
      return null; // Return null if there is no matching local response
    }
  }


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;


    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftkey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));