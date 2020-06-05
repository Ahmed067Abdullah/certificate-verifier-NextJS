import contract from '../../shared/contract';

export const getCertificate = uuid => {
  const { ethereum } = window;
  return new Promise((resolve, reject) => {
    const promise1 = contract.methods.getCertificate(uuid)
      .call();
    const promise2 = contract.methods.getCertificateAwarderDetails(uuid)
      .call();
    Promise.all([promise1, promise2])
      .then((res) => {
        resolve({
          ...res[0],
          '6': res[1][1],
          '7': res[1][2],
        })
      })
      .catch(err => reject(err));
  })
};