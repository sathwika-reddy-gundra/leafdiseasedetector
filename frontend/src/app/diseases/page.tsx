"use client";

import React from "react";

const diseases = [
  {
    name: "Bean Rust",
    image: "/bean-rust.jpg",
    description:
      "Bean Rust is a common fungal disease that affects bean plants, causing yellow to brown spots on leaves. Remove affected leaves and avoid overhead watering to reduce spread.",
    symptoms: [
      "Yellow to brown spots on leaves",
      "Powdery pustules on underside of leaves",
      "Premature leaf drop"
    ],
    tips: [
      "Remove and destroy infected leaves.",
      "Improve air circulation around plants.",
      "Apply recommended fungicides if necessary."
    ]
  },
  {
    name: "Angular Leaf Spot",
    image: "/angular-leaf-spot.jpg",
    description:
      "Angular Leaf Spot causes angular, water-soaked lesions on leaves that later become necrotic. It is favored by wet conditions.",
    symptoms: [
      "Angular, water-soaked spots",
      "Lesions turn brown and dry",
      "Defoliation in severe cases"
    ],
    tips: [
      "Avoid overhead irrigation.",
      "Use disease-free seed.",
      "Rotate crops to reduce pathogen buildup."
    ]
  },
  {
    name: "Bean Anthracnose",
    image: "/bean-anthracnose.jpg",
    description:
      "Bean Anthracnose is a fungal disease that causes dark, sunken lesions on stems, pods, and leaves.",
    symptoms: [
      "Dark, sunken lesions with pink spore masses",
      "Leaf spots with dark borders",
      "Pod infection leads to seed discoloration"
    ],
    tips: [
      "Plant resistant varieties.",
      "Do not save seed from infected plants.",
      "Practice crop rotation."
    ]
  },
  {
    name: "Bacterial Blight",
    image: "/bacterial-blight.jpg",
    description:
      "Bacterial Blight is a serious disease of beans, causing water-soaked spots that turn brown and necrotic, often with a yellow halo.",
    symptoms: [
      "Small, water-soaked spots on leaves",
      "Spots enlarge and turn brown with yellow halos",
      "Can affect stems and pods"
    ],
    tips: [
      "Use certified disease-free seed.",
      "Avoid working in wet fields.",
      "Remove and destroy infected debris."
    ]
  },
  {
    name: "Powdery Mildew",
    image: "/powdery-mildew.jpg",
    description:
      "Powdery Mildew is a fungal disease that appears as white, powdery spots on leaves and stems, leading to reduced plant vigor.",
    symptoms: [
      "White, powdery spots on leaves and stems",
      "Distorted or stunted growth",
      "Premature leaf drop"
    ],
    tips: [
      "Ensure good air circulation.",
      "Apply fungicides as recommended.",
      "Remove infected plant parts."
    ]
  },
  {
    name: "Root Rot",
    image: "/root-rot.jpg",
    description:
      "Root Rot is caused by soil-borne fungi and leads to browning and rotting of roots, causing wilting and yellowing of leaves.",
    symptoms: [
      "Wilting and yellowing of leaves",
      "Brown, mushy roots",
      "Stunted growth"
    ],
    tips: [
      "Improve soil drainage.",
      "Avoid overwatering.",
      "Rotate crops and avoid planting in infected soil."
    ]
  },
  {
    name: "Mosaic Virus",
    image: "/mosaic-virus.jpg",
    description:
      "Mosaic Virus causes mottled, yellow-green patterns on leaves, often with distortion and stunted growth.",
    symptoms: [
      "Mottled, yellow-green leaf patterns",
      "Leaf distortion",
      "Reduced plant growth and yield"
    ],
    tips: [
      "Control aphids and other insect vectors.",
      "Remove infected plants.",
      "Plant resistant varieties."
    ]
  }
];

export default function DiseaseLibrary() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Disease Library</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {diseases.map((disease, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <img
              src={disease.image}
              alt={disease.name}
              className="w-32 h-32 object-contain mb-4 rounded-lg border border-gray-200"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
            <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">{disease.name}</h2>
            <p className="text-gray-700 text-sm mb-2 text-center">{disease.description}</p>
            <div className="mb-2">
              <span className="font-semibold text-gray-800">Symptoms:</span>
              <ul className="list-disc list-inside text-gray-600 text-xs">
                {disease.symptoms.map((symptom, sidx) => (
                  <li key={sidx}>{symptom}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-gray-800">Tips:</span>
              <ul className="list-disc list-inside text-gray-600 text-xs">
                {disease.tips.map((tip, tidx) => (
                  <li key={tidx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
