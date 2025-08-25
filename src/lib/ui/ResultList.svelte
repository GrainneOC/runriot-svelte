<script lang="ts">
  export let results = [
    {
      user: "grawnya@gmail.com", 
      distance: 4,
      duration: 20,
      date: "10/6/2024",
      trail: { name: "Blackrock Greenway", location: "Cork" },
      lat: "51.8999",
      lng: "-8.4027"
    },
    {
      user: "joan@yahoo.com",
      distance: 7,
      duration: 40,
      date: "15/6/2024",
      trail: { name: "Mallow Castle Greenway", location: "Cork" },
      lat: "52.1343",
      lng: " -8.6393"
    },
    {
      user: "tomh@outlook.com",
      distance: 15,
      duration: 70,
      date: "20/6/2024",
      trail: { name: "Phoenix Park", location: "Dublin" },
      lat: "53.3559",
      lng: "-6.3298"
    }
  ];
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Distance</th>
      <th>Duration</th>
      <th>Date</th>
      <th>Trail</th>
    </tr>
  </thead>
  <tbody>
    {#each results as result}
      <tr>
        <td>
          {result.distance}
        </td>
        <td>
          {result.duration}
        </td>
        <td>
          {result.date}
        </td>
        <td>
          {result.trail.name}, {result.trail.location}
        </td>
        <td>
          {result.user}
        </td>
      </tr>
    {/each}
  </tbody>
</table>