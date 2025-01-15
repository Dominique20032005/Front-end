import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">
              LEARNING-SOCIAL
            </h1>
            <div className="space-y-3 text-gray-300">
              <p className="text-lg">
                Created and designed on Dec 7th 2024, Learning Social is the place where you can share and explore.
              </p>
              <p className="text-lg">
                We hope that Learning Social can help you with your education process, meet new people, learning new things that you wanted.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: '2', label: 'Creators' },
              { number: '20', label: 'Members' },
              { number: '3', label: 'Platforms' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-lg bg-gray-800/50 backdrop-blur border border-gray-700"
              >
                <div className="text-3xl font-bold text-teal-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Creators Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center text-teal-400">Creators</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: 'Nguyen Huu Anh Duc', id: '23560009' },
                { name: 'Ho Huy Thien', id: '23560063' },
              ].map((creator) => (
                <div
                  key={creator.id}
                  className="p-6 rounded-lg bg-gray-800/50 backdrop-blur border border-gray-700 text-center space-y-2"
                >
                  <h3 className="text-xl font-semibold text-gray-100">{creator.name}</h3>
                  <p className="text-gray-400">ID: {creator.id}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
