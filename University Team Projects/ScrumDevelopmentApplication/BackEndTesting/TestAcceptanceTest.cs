using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.AcceptanceTestServiceReference;
using NUnit.Framework;

namespace BackEndTesting
{
    [TestFixture]
    public class TestAcceptanceTest
    {
        private AcceptanceTestServiceClient _acceptanceTestClient;

        [SetUp]
        public void Setup()
        {
            _acceptanceTestClient = new AcceptanceTestServiceClient();
            _acceptanceTestClient.Open();
        }

        [Test]
        public void Test_ValidInsertAcceptanceTest()
        {
            Assert.IsTrue(_acceptanceTestClient.InsertAcceptanceTest("Test", "Test", 2));
        }



        [Test]
        public void Test_InvalidUSIdAcceptanceTest()
        {
            Assert.IsFalse(_acceptanceTestClient.InsertAcceptanceTest("Test", "Testing", -100));
        }

        [TearDown]
        public void Teardown()
        {
            _acceptanceTestClient.Close();
        }
    }

}
