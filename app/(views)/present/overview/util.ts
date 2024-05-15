export const handlePrint = (id: string) => {
  const originalContent = document.body.innerHTML;
  const printContent = document.querySelector(`[id=${id}]`)?.innerHTML;
  document.body.innerHTML = printContent as string;
  window.print();
  document.body.innerHTML = originalContent;
};
