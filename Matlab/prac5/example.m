clear;clc;

% load training set, testing set, and validation set
TRN = load('data/hugo_spam686_training.mat','F','payloads');
TST = load('data/hugo_spam686_testing.mat','F','payloads');
VAL = load('data/hugo_spam686_validation.mat','F','payloads');

% settings
settings.subspace_dimension = 100;
settings.tree_levels = 2;
settings.prng_seed = 1;
settings.shrinking_parameter = 0.2;
settings.verbose = 1;

% execute gradient boosting
results = GBM_steganalysis(TRN,VAL,TST,settings);

% summarize and plot the results
fprintf('---\nRESULTS:\n')
fprintf(' - optimal number of stages: %i\n',results.optimal_number_of_stages);
fprintf(' - training time: %.1f seconds\n',results.training_time);
fprintf(' - training set MSE: %i\n',results.MSE_training_final);
fprintf(' - validation set MSE: %i\n',results.MSE_testing_final);
fprintf(' - testing set MSE: %i\n',results.MSE_validation_final);
figure(1);clf;
plot(1:length(results.MSE_training_all_stages),results.MSE_training_all_stages,'b');hold on;
plot(1:length(results.MSE_testing_all_stages),results.MSE_testing_all_stages,'r');hold on;
plot(1:length(results.MSE_validation_all_stages),results.MSE_validation_all_stages,'k');hold on;
legend('training MSE','testing MSE','validation MSE');
xlabel('Stage');
ylabel('MSE');
