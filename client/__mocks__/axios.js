const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}

module.exports = axios

// axios.get.mockResolvedValue({
//   data: {
//     events: [
//       {
//         title: "Band playing live",
//         winery: "Akash Winery",
//         date: "2020-04-01",
//         time: "8pm",
//         description: "This is a description.",
//         price: "$10",
//         membersOnly: false,
//         adultsOnly: true,
//         attending: [],
//         _id: 1
//       },
//       {
//         title: "Band playing live",
//         winery: "Akash Winery",
//         date: "2020-04-01",
//         time: "8pm",
//         description: "This is a description.",
//         price: "$10",
//         membersOnly: false,
//         adultsOnly: true,
//         attending: [],
//         _id: 2
//       },
//       {
//         title: "Band playing live",
//         winery: "Akash Winery",
//         date: "2020-04-01",
//         time: "8pm",
//         description: "This is a description.",
//         price: "$10",
//         membersOnly: false,
//         adultsOnly: true,
//         attending: [],
//         _id: 3
//       }
//     ]
//   }
// })