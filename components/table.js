export default function Table(props) {
  const data = props.data
    ? props.data.amountExpenditure.map((amount, index) => ({
        particulars: props.data.amountParticulars[index],
        amount: amount,
      }))
    : null;

  return (
    <div class="w-full max-w-2xl bg-white shadow-lg rounded-sm border border-gold bg-white">
      <div class="overflow-x-auto p-3">
        <table class="table-auto w-full">
          <thead class="text-xs font-bold uppercase text-black bg-gray-50">
            <tr>
              <th class="p-2">
                <div class=" text-left">Particulars</div>
              </th>
              <th class="p-2">
                <div class=" text-left">Amount</div>
              </th>
            </tr>
          </thead>

          <tbody class="text-sm divide-y divide-gray-100">
            {data.map((item) => (
              <tr>
                <td class="p-2">
                  <div class="font-medium text-black">{item.particulars}</div>
                </td>
                <td class="p-2">
                  <div class="font-medium text-black">{item.amount}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
