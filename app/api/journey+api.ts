export async function POST(request: Request) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const body = await request.json();
  const { origin, destination } = body;

  // Dummy journey planning response
  return Response.json({
    routes: [
      {
        id: '1',
        name: 'Recommended Route',
        duration: '35 mins',
        fare: 'Rs. 30',
        steps: [
          {
            type: 'walk',
            description: 'Walk to Blue Line Station',
            duration: '5 mins',
            distance: '400m'
          },
          {
            type: 'metro',
            line: 'Blue Line',
            from: 'Station A',
            to: 'Station B',
            duration: '25 mins',
            stops: 6
          },
          {
            type: 'walk',
            description: 'Walk to destination',
            duration: '5 mins',
            distance: '300m'
          }
        ]
      },
      {
        id: '2',
        name: 'Alternative Route',
        duration: '45 mins',
        fare: 'Rs. 25',
        steps: [
          {
            type: 'walk',
            description: 'Walk to Red Line Station',
            duration: '8 mins',
            distance: '600m'
          },
          {
            type: 'metro',
            line: 'Red Line',
            from: 'Station X',
            to: 'Station Y',
            duration: '30 mins',
            stops: 8
          },
          {
            type: 'walk',
            description: 'Walk to destination',
            duration: '7 mins',
            distance: '500m'
          }
        ]
      }
    ]
  });
}