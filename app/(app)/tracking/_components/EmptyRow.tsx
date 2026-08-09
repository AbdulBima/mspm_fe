export function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-10 text-center text-sm text-[#84828C]">
        {message}
      </td>
    </tr>
  );
}
