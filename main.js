let peerConnection = new RTCPeerConnection();
let localStream;
let remoteStream;

const init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  remoteStream = new MediaStream();
  document.getElementById('user-1').srcObject = localStream;
  document.getElementById('user-2').srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };
};

const createOffer = async () => {
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription);
    }
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
};

const createAnswer = async () => {
  const offer = JSON.parse(document.getElementById('offer-sdp').value);

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription);
    }
  };

  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
};

const addAnswer = async () => {
  const answer = JSON.parse(document.getElementById('answer-sdp').value);

  if (!peerConnection.currentRemoteDescription) {
    peerConnection.setRemoteDescription(answer);
  }
};

init();

document.getElementById('create-offer').addEventListener('click', createOffer);
document.getElementById('create-answer').addEventListener('click', createAnswer);
document.getElementById('add-answer').addEventListener('click', addAnswer);


x // Function to apply the selected color scheme
function applyColorScheme(scheme) {
    document.body.className = scheme;
  }
  
  // Event listeners for color-changing buttons
  document.getElementById("blue-button").addEventListener("click", () => {
    applyColorScheme("blue-color-scheme");
  });
  
  document.getElementById("green-button").addEventListener("click", () => {
    applyColorScheme("green-color-scheme");
  });
  
  document.getElementById("red-button").addEventListener("click", () => {
    applyColorScheme("red-color-scheme");
  });
  
  // Initial color scheme
  applyColorScheme("blue-color-scheme"); // You can set the initial color scheme here
  